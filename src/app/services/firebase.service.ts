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
    const deepRef = ref(myRef, Math.random().toString());
    return uploadBytes(deepRef, blob);
  }

  private test(ref: StorageReference) {
    const extractImageUrlsFromListResult = (list: ListResult) =>
      Promise.all(
        list.items.reduce(
          (promises, item) => [...promises, getDownloadURL(item)],
          [] as Promise<string>[]
        )
      );
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
          [...re, this.test(ref(rootRef, tableName))],[] as Promise<string[]>[] 
        ));
      })
      .then(twoDArr => twoDArr.flat())
  }
}
