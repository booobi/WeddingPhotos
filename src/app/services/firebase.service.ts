import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  StorageReference,
  ListResult,
} from 'firebase/storage';

import { Injectable } from '@angular/core';

function generateTimeSortableId() {
  const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  let now = new Date().getTime();

  let timeStampChars = new Array(8);
  for (let i = 7; i >= 0; i--) {
    timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
    now = Math.floor(now / 64);
  }

  // Add 12 random characters to ensure uniqueness
  let randomChars = '';
  for (let i = 0; i < 12; i++) {
    randomChars += PUSH_CHARS.charAt(Math.floor(Math.random() * 64));
  }

  return timeStampChars.join('') + randomChars;
}

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  app: any;
  storage: any;

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAKvwO0DnPurzni0Wfp97ASUrmqB5J_Cuo',
      authDomain: 'wedding-photos-51e8c.firebaseapp.com',
      projectId: 'wedding-photos-51e8c',
      storageBucket: 'wedding-photos-51e8c.firebasestorage.app',
      messagingSenderId: '988703399995',
      appId: '1:988703399995:web:eac4d6c13cfae671debc1e',
      measurementId: 'G-FBFJ0GFRKD',
    };
    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
  }

  uploadFile(blob: Blob) {
    const myRef = ref(this.storage, 'table2');
    const deepRef = ref(myRef, generateTimeSortableId());
    return uploadBytes(deepRef, blob);
  }

  private getCachedDownloadUrl(item: StorageReference) {
    const cachedItemUrl = localStorage.getItem(item.name);
    if (cachedItemUrl) {
      return Promise.resolve(cachedItemUrl);
    }
    return getDownloadURL(item).then(url => {localStorage.setItem(item.name, url); return url});
  }

  private extractDownloadUrlsFromRef(ref: StorageReference) {
    const extractImageUrlsFromListResult = (list: ListResult) =>
      {
        return Promise.all(
        list.items.reduce(
          (promises, item) => [...promises, this.getCachedDownloadUrl(item)],
          [] as Promise<string>[]
        )
      )};
    return listAll(ref)
      .then((rootDirsListRef) => {
        console.log({ rootDirsListRef });
        return extractImageUrlsFromListResult(rootDirsListRef);
      })
  }

  getAllImages() {
    const rootRef = ref(this.storage);
    return listAll(rootRef)
      .then((rootDirsListRef) => {
        const tablesNames = rootDirsListRef.prefixes.map(
          (prefix) => prefix.name
        );
        return Promise.all(tablesNames.reduce((re, tableName) =>
          [...re, this.extractDownloadUrlsFromRef(ref(rootRef, tableName))],[] as Promise<string[]>[] 
        ));
      })
      .then(twoDArr => twoDArr.flat())
  }
}
