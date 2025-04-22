import { computed, inject, Injectable } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { FirebaseService } from '../services/firebase.service';

const MOCK_IMG_URLS = [
  'https://buffer.com/resources/content/images/2024/11/free-stock-image-sites.png',
  'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
  'https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg',
  'https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg',
  'https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
  'https://i0.wp.com/picjumbo.com/wp-content/uploads/violet-colorful-sunset-sky-on-the-beach-free-photo.jpeg?w=600&quality=80',
];

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
      firebase.getAllImages().then(imgUrls => {
        patchState(store, {
          isLoadingGalleryImages: false,
          galleryImageUrls: imgUrls,
        });
      })
    },
  }))
);
