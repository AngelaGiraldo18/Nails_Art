import { Injectable } from '@angular/core';
import { GravatarConfig } from 'ngx-gravatar';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSharedServiceService {
  private gravatarConfig: GravatarConfig = {
    size: 100,
    fallback: 'retro',
  };

  constructor() { }

  getGravatarConfig(): GravatarConfig {
    return this.gravatarConfig;
  }

  setGravatarConfig(config: GravatarConfig): void {
    this.gravatarConfig = config;
  }
}
