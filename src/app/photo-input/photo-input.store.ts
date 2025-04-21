import { computed, Injectable } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export interface PhotoInputState {
  stagedFiles: any[];
  isUploadingFiles: boolean;
}

export const PhotoInputStore = signalStore(
  withState(<PhotoInputState>{ isUploadingFiles: false, stagedFiles: [] }),
  withComputed(({ stagedFiles }) => ({
    stagedFileUrls: computed(() => stagedFiles().map(URL.createObjectURL)),
    hasStagedFiles: computed(() => !!stagedFiles().length),
  })),
  withMethods((store) => ({
    stageFiles(files: File[]): void {
      patchState(store, { stagedFiles: [...store.stagedFiles(),...files] });
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
      setTimeout(() => {
        patchState(store, { isUploadingFiles: false });
      }, 2000)
    }
  }))
);
