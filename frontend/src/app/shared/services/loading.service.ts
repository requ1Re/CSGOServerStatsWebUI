import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading = new BehaviorSubject<boolean>(false);

  public showLoading(){
    console.log("[LoadingService] Showing Loading Spinner");
    this.loading.next(true);
  }

  public hideLoading(){
    console.log("[LoadingService] Hiding Loading Spinner");
    this.loading.next(false);
  }
}
