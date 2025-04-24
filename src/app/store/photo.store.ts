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
      const uploadPromises = store
        .stagedFiles()
        .map((stagedFile) => firebase.uploadFile(stagedFile));

        Promise.all(uploadPromises)
          .then((snapshots) => {
            console.log('Uploaded a blob or file!', snapshots);
            (window as any).Toastify({
              text: "Photos uploaded. See them in the gallery below",
              duration: 3000,
              gravity: "bottom",
              position: "center", 
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
            }).showToast();
            patchState(store, {
              isUploadingFiles: false,
              stagedFiles: [],
              uploadStatus: 'success',
            });
          })
          .catch((e) => {
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
      }, 5000);
    },
  })
);
