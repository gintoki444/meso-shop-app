import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStorage(key :any, value :any) {
    Preferences.set({key: key, value: value});
  }

  getStorage(key :any) {
    return Preferences.get({key: key});
  }

  removeStorage(key :any) {
    Preferences.remove({key: key});
  }

  clearStorage() {
    Preferences.clear();
  }
}
