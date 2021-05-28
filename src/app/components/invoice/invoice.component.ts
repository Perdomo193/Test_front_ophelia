import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import  { FormGroup, FormBuilder, Validators  }  from  '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { invoice } from '../../models/invoice'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {

  myUrl = 'https://localhost:44311/'
  myProducts = 'api/Products'
  myInvoices = 'api/Invoices'
  myClients = 'api/Clients'
  myInventories = 'api/Inventories'
  my = '/'
  
  datos = [{"id":1,"name":"Naranjas","price":500},{"id":2,"name":"Moras","price":500}]
  
  constructor(private http: HttpClient) {
    this.http.get(this.myUrl+this.myProducts).subscribe((data: any)=> {
      this.datos = data
    })
  }
 
  ngOnInit() {}

  generate(){
    this.result = (this.value1*this.price1)+(this.value2*this.price2)+(this.value3*this.price3)+(this.value4*this.price4)+(this.value5*this.price5)
    this.load_invoice(this.product1, this.day, this.month, this.year, this.value1)
   // this.load_invoice(this.product2, this.day, this.month, this.year, this.value2)
    //this.load_invoice(this.product3, this.day, this.month, this.year, this.value3)
    //this.load_invoice(this.product4, this.day, this.month, this.year, this.value4)
    //this.load_invoice(this.product5, this.day, this.month, this.year, this.value5)
  }

  load_invoice(product:number, day:number, month:number, year:number, value:number){
    if(product!=0 && day!=0 && month!=0 && year!=0 && value!=0){
      this.http.post(this.myUrl+this.myInvoices,
        {
          "id_product": product,
          "date_day": day,
          "date_month": month,
          "date_year": year,
          "units": value
        } 
      ).subscribe((datas: any)=> {
        console.log('id_cliente:',datas.id)
        this.load_client(datas.id)
        this.get_inventory(product, value)
      })
    }
  }
  get_inventory(product:number, value:number){
    this.http.get(this.myUrl+this.myInventories).subscribe((datas: any)=> {
      console.log('Inventory:',datas)
      var datab = Object.keys(datas).length
      console.log('Numero:',datab)
      for(let i=0; i<datab; i++){
        console.log('Id_product:',datas[i].id_product)
        if(datas[i].id_product == product){
          var unit = datas[i].id_product - value
          var id = datas[i].id
          //this.reload_inventory(id,unit)
        }
      }
    })
  }
  reload_inventory(id:number, unit:number){
    this.http.post(this.myUrl+this.myInventories+this.my+id,
      {
        "id": id,
        "units": unit
      }
    ).subscribe((datas: any)=> {
      console.log('Inventory:',datas)
      
    })
  }  
  load_client(id:number){
    this.http.post(this.myUrl+this.myClients,
      {
        "name": this.name,
        "id_invoice": id,
        "age": this.age
      }
    ).subscribe((res: any)=> {
      console.log(res)
    })
  }
  
  product1: number = 0
  product2: number = 0
  product3: number = 0
  product4: number = 0
  product5: number = 0
  
  value1: number = 0
  value2: number = 0
  value3: number = 0
  value4: number = 0
  value5: number = 0
  result: number = 0
  
  price1: number = 0
  price2: number = 0
  price3: number = 0
  price4: number = 0
  price5: number = 0
  
  name: null = null
  age: null = null
  day: number = 0
  month: number = 0
  year: number = 0

  units: number = 0
}
