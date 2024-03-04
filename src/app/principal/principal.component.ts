import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('beforeButton') beforeButton!: ElementRef;
  sliders: ElementRef<Element>[] = [];
  value: number = 0;
  
  viewDate: Date = new Date();


  ngAfterViewInit() {
    this.sliders = Array.from(document.querySelectorAll('.testimony__body')).map((element: Element) => {
      return {
        nativeElement: element
      } as ElementRef<Element>;
    });
  }

  onNextButtonClick() {
    this.changePosition(1);
  }

  onBeforeButtonClick() {
    this.changePosition(-1);
  }

  changePosition(add: number) {
    const currentTestimony = document.querySelector('.testimony__body--show') as HTMLElement;
    this.value = Number(currentTestimony.dataset['id']) || 0;
    this.value += add;

    currentTestimony.classList.remove('testimony__body--show');

    if (this.value === this.sliders.length + 1 || this.value === 0) {
      this.value = this.value === 0 ? this.sliders.length : 1;
    }

    this.sliders[this.value - 1].nativeElement.classList.add('testimony__body--show');
  }

  imagenes: string[] = ['leftarrow.svg', 'rightarrow.svg', 'IMG_20230418_142518.jpg', 'JuanEsteban.jpeg','foto-jesus.jpg','sergio.jpg','carlos.jpg'];


}
