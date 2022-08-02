import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // 0 - importare negli imports di app.module ReactiveFormsModule

  //1 - creare una proprietà FormGroup e associalra con property binding al form del template
  formUtenti!:FormGroup;

  //2 - iniettare il FormBuilder
  constructor(private fb:FormBuilder){}

  ngOnInit(){
    //3 - creare un formGroup con i dati che deve raccogliere
    this.formUtenti = this.fb.group({
      //Ogni prorpietà rappresenta un dato del form, ogni valore sarà un array con dentro la value, i validatori, e altre informazioni del FormControl -> ovvero l'input
      nome: [null, [Validators.required, Validators.minLength(4)]],
      //Per avere campi multipli suare il metodo del FormBuilder .array()
      tel: this.fb.array([])
    })
  }

  // 4 - creare dei metodi per leggere facilmnte i FormControls (e volendo gli errori per la validazione)
  getFormControl(name:string) {
    //GET cerca il FormControl in base al nome della Proprietà nel FormGroup
    return this.formUtenti.get(name)
  }
  getFormControlArray(name:string) {
    //Se dobbiamo far restituire un Control che ha più inputs possiamo già segnalare
    // as FormArray -> altrimenti possiamo scriverlo quando usaimo il metodo
    return this.getFormControl(name) as FormArray
  }
  getErrors(name:string, err:string) {
    if(this.getFormControl(name)?.errors)
      return this.getFormControl(name)?.errors![err]
    return false
  }

  // nomeValid():boolean{
  //   if(this.getFormControl('nome')?.value == "CIAO") return false
  //   return true
  // }


  //  7 - per agigunger un niovo FormControl lo creiamo vuoto e lo aggiungiamo all'array
  addTel() {
    //Se il form control lo creiamo con il constructor allora passiamo value iniziale e Validators come parametri
    let nuovoInput = new FormControl("+39", [Validators.minLength(10)])
    this.getFormControlArray("tel").push(nuovoInput)
  }

  formSubmit() {
    console.log(this.formUtenti.value)
    console.log("VALID", this.formUtenti.valid)
  }


}
