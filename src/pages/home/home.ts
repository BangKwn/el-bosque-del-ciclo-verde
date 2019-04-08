import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController, IonicPage } from 'ionic-angular';
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[]=[];
  page: number;
  moreproducts: any[]=[];
  searchQuery: string = "";
  produc: any[]=[];
  @ViewChild('productSlides') productSlides: Slides;


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private WP: WoocommerceProvider) {

    this.page = 2;

    this.WooCommerce = WP.init();

    this.LoadMoreProducts(null);

    this.WooCommerce.getAsync('products').then( (data) => {
      this.products= JSON.parse(data.body);
      console.log(JSON.parse(data.body))
  for(var k = 0; k <= this.products.length; k++){
 this.produc.push(this.products[k]);
}}, (err) => {
    console.log(err)
  })

  }

  ionViewDidLoad(){
    setInterval(() => {

      if (this.productSlides.getActiveIndex() == this.productSlides.length() -1) {
        this.productSlides.slideTo(0)
      }

      this.productSlides.slideNext();
    }, 3000)
  }

  LoadMoreProducts(event){

    if (event == null) {
      this.page = 2;
      this.moreproducts = [];
    }
    else {
      this.page ++;
    }

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      this.moreproducts = this.moreproducts.concat(this.produc);
      if (event != null) {
        event.complete();
      }

      if (JSON.parse(data.body).products < 10) {
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products to load!",
          duration: 3000
        }).present();
      }

    }, (err) => {
      console.log(err)
    })
  }

  openProductPage(product)
  {
    this.navCtrl.push('ProductDetailsPage', {"product": product} )
  }

  onSearch(event){
    if (this.searchQuery.length > 0) {
      this.navCtrl.push('SearchPage', {"searchQuery": this.searchQuery});
    }
  }

}