import { Component,OnInit } from '@angular/core';
import {Cloudinary} from '@cloudinary/url-gen'

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})

export class AyudaComponent implements OnInit{
  ngOnInit() {
    const cld = new Cloudinary({cloud: {cloudName: 'dhvnlsy1j'}});
  }
}
