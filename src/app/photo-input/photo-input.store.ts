import { Injectable } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface PhotoInputState {
  stagedFiles: any[];
  isUploadingFiles: boolean;
}

export const PhotoInputStore = signalStore(
  withState(<PhotoInputState>{ isUploadingFiles: false, stagedFiles: [] }),
  withMethods((store) => ({
    stageFiles(files: any[]): void {
      patchState(store, { stagedFiles: files });
    },
    removeStagedFile(index: number) {
      patchState(store, { stagedFiles: store.stagedFiles().filter((file, i) => i !== index) });
    },
    removeAllStagedFiles() {
      patchState(store, { stagedFiles: [] });
    }
  }))
);
