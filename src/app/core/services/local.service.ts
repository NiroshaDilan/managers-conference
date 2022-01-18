import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public setItem(key: string, value: string){
    localStorage.setItem(key,value);
  }

  public getItem(key: string): string | null{
    return localStorage.getItem(key);
  }

  public clearItem(key: string){
    localStorage.removeItem(key);
  }
}
