import { Component, Inject, ReflectiveInjector } from "@angular/core";
import { OverlayContainer } from "@angular/material";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  darkTheme = false;
  squareState: string;

  constructor(private oc: OverlayContainer, @Inject("BASE_CONFIG") config) {
    //通过coreModule中的providers的provider注入
    console.log(config);
    //注入者
    const injector = ReflectiveInjector.resolveAndCreate([
      Person, //就是provide和useClass(token)的简写
      //这下面返回的都是那一个的实例
      {
        provide: Address,
        useFactory: () => {
          if (this.darkTheme) {
            return new Address("北京", "北京", "朝阳区", "xx 街道 xx 号");
          } else {
            return new Address("西藏", "拉萨", "xx区", "xx 街道 xx 号");
          }
        }
      },

      //返回的是动态信息《内用工厂方法》//第一种方法 得到新型的实例
      // {
      //   provide: Address,
      //   useFactory: () => {
      //     return () => {
      //       if (this.darkTheme) {
      //         return new Address("北京", "北京", "朝阳区", "xx 街道 xx 号");
      //       } else {
      //         return new Address("西藏", "拉萨", "xx区", "xx 街道 xx 号");
      //       }
      //     };
      //   }
      // },
      {
        provide: Id,
        useFactory: () => {
          return Id.getInstance("idcard");
        }
      }
    ]);
    const childInjector = injector.resolveAndCreateChild([Person]); //第二种方法 得到新型的实例
    const person = injector.get(Person);
    const personFromChild = childInjector.get(Person);
    console.log(
      JSON.stringify(person),
      person === personFromChild,
      JSON.stringify(personFromChild)
    );
  }

  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.themeClass = dark ? "myapp-dark-theme" : null;
  }
}

export class Id {
  static getInstance(type: string): Id {
    //设置
    return new Id();
  }
}

export class Address {
  province: string;
  city: string;
  district: string;
  street: string;
  constructor(province, city, district, street) {
    this.province = province;
    this.city = city;
    this.district = district;
    this.street = street;
  }
}

export class Person {
  id: Id;
  address: Address;
  constructor(@Inject(Id) id, @Inject(Address) address) {
    this.id = id;
    this.address = address;
  }
}
