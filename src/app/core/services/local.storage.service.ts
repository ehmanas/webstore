import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {Library} from '../library';

@Injectable()
export class LocalStorageService {

    private readonly isNode: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
    //   this.isNode = typeof module !== 'undefined'
        this.isNode = isPlatformServer(this.platformId);
    }


    save(name: any, data: any) {
        if (this.isNode) {
            return;
        }

        const localDataString = localStorage.getItem(Library.storageKey);
        let localData: any;
        if (localDataString) {
            localData = JSON.parse(localDataString);
        } else {
            localData = {};
        }
        localData[name] = data;
        localStorage.setItem(Library.storageKey, JSON.stringify(localData));
    }

    get(name: any) {
        if (this.isNode) {
            return;
        }
        const data = JSON.parse(localStorage.getItem(Library.storageKey) as string);
        if (!data) {
            return undefined;
        }
        if (name) {
            if (data[name]) {
                return data[name];
            } else {
                return {};
            }
        }
        return data;
    }
}
