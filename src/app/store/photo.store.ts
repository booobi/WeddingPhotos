import { computed, inject, Injectable } from '@angular/core';
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

      firebase
        .uploadFile(store.stagedFiles()[0])
        .then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
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
