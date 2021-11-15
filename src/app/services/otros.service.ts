import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OtrosService {
  recurosBaseURL: string = environment.URL_BASE;

  constructor(private http: HttpClient) {}
  listarNac() {
    return this.http.get(this.recurosBaseURL + "listar_nacionalidades.json");
  }
}
