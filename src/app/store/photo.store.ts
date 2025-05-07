import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { FirebaseService } from '../services/firebase.service';
import {resizeImage, showToast } from './store.utils';

export interface PhotoState {
  // photo input
  stagedFiles: any[];
  isUploadingFiles: boolean;
  uploadStatus: 'success' | 'error' | null;

  // gallery
  galleryImageUrls: string[];
  isLoadingGalleryImages: boolean;
}

export const PhotoStore = signalStore(
  withState(<PhotoState>{
    isUploadingFiles: false,
    stagedFiles: [],
    uploadStatus: null,
    galleryImageUrls: [],
    isLoadingGalleryImages: false,
  }),
  withComputed(({ stagedFiles }) => ({
    stagedFileUrls: computed(() => stagedFiles().map(URL.createObjectURL)),
    hasStagedFiles: computed(() => !!stagedFiles().length),
  })),
  withMethods((store, firebase = inject(FirebaseService)) => ({
    stageFiles(files: File[]): void {
      patchState(store, { stagedFiles: [...store.stagedFiles(), ...files] });
    },
    removeStagedFile(index: number) {
      patchState(store, {
        stagedFiles: store.stagedFiles().filter((file, i) => i !== index),
      });
    },
    removeAllStagedFiles() {
      patchState(store, { stagedFiles: [] });
    },
    uploadStagedFiles() {
      patchState(store, { isUploadingFiles: true });
      
      const thumbnailsUploadPromises = store
        .stagedFiles()
        .map(stagedFile => resizeImage({file: stagedFile, maxSize: 512}))
        .map((rezisedStagedFilePromise) => rezisedStagedFilePromise.then(resizedStagedFile => firebase.uploadFile(resizedStagedFile, 'thumbs')));

        const imageUploadPromises = store
        .stagedFiles()
        .map(stagedFile => firebase.uploadFile(stagedFile, 'images'));

        Promise.all([...thumbnailsUploadPromises, ...imageUploadPromises])
          .then((snapshots) => {
            showToast("Photos uploaded. See them in the gallery below", 'success');
            patchState(store, {
              isUploadingFiles: false,
              stagedFiles: [],
              uploadStatus: 'success',
            });
          })
          .catch((e) => {
            showToast("There was a problem uploading the photos.", 'error',);
            patchState(store, {
              isUploadingFiles: false,
              stagedFiles: [],
              uploadStatus: 'error',
            });
          });
    },
    getGalleryImages() {
      patchState(store, {
        isLoadingGalleryImages: true,
        galleryImageUrls: [],
      });
      firebase.getAllImages().then((imgUrls) => {
        console.log('test', {imgUrls})
        patchState(store, {
          isLoadingGalleryImages: false,
          galleryImageUrls: imgUrls,
        });
      });
    },
  })),
  withHooks({
    onInit: (store, firebase = inject(FirebaseService)) => {
      setInterval(() => {
        firebase.getAllImages().then((imgUrls) => {
          patchState(store, {
            isLoadingGalleryImages: false,
            galleryImageUrls: imgUrls,
          });
        });
      }, 3000);
    },
  })
);
