import {Component} from '@angular/core';
import {PlatformHomeInfo} from "../../types/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  platforms: PlatformHomeInfo[] = [
    {
      link: 'https://hotline.ua/',
      text: 'Український онлайн-сервіс для вибору товарів і порівняння цін',
      image: './assets/images/platforms/hotline.png',
      position: 'left',
      isComingSoon: true
    },
    {
      link: 'https://www.olx.ua/uk/',
      text: 'Платформа онлайн-оголошень, яка об\'єднує людей для покупки, продажу або обміну товарами та послугами',
      image: './assets/images/platforms/olx.png',
      position: 'right',
      isComingSoon: true
    },
    {
      link: 'https://rozetka.com.ua/ua/',
      text: 'Український інтернет-магазин та маркетплейс, що з\'явився 2005 року. Станом на серпень 2022 року сайт посідає 5 місце серед найвідвідуваніших в Україні',
      image: './assets/images/platforms/rozetka.png',
      position: 'left'
    },
  ]
}
