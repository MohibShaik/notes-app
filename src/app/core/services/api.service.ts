import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * @const {object} API_CONFIG
 * @desc define constant for API calls
 */
const API_CONFIG = {
  apiHost: environment.apiUrl,
};

/**
 * @const {object} API
 * @desc List of all API urls
 */
const API_URLS = {
  createNewUser: `users/signup`,
  login: `users/login`,
  listOfNotesByUserId: (userId: string) => `notes/${userId}/notes_list`,

  //categories
  listOfCategories: `categories`,

};

@Injectable({
  providedIn: 'root',
})

/**
 * @class ApiService
 * @desc Provides API Configuration (Url, Host)
 * for Application to make HTTP API calls
 */
export class ApiService {
  constructor() {}

  /**
   * @prop API_URLs
   * @return {object} API_URLS object with api urls;
   */
  get API_URLs() {
    return API_URLS;
  }

  /**
   * @prop API_CONFIG
   * @return {object} API_CONFIG object with api configuration e.g HOST value;
   */
  get API_CONFIG() {
    return API_CONFIG;
  }
}