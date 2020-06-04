import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from "rxjs/operators"
import { ImageService } from 'src/app/shared/image.service';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: [
  ]
})
export class ImageComponent implements OnInit {
imgSrc : String='/assets/file_logo.svg';
selectedImage : any=null;
isSubmitted : boolean;
  formTemplate =new FormGroup({
  Legende : new FormControl('',Validators.required),
  Tranche : new FormControl(''),
  imageUrl : new FormControl('',Validators.required)
})
  constructor(private storage:AngularFireStorage, private service :ImageService) { }

  ngOnInit(): void {
    this.resetForm();
  }
showPreview(event:any){
  if(event.target.files && event.target.files[0])
  {
    const reader = new FileReader();
    reader.onload = (e:any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);

  }
  else {
    this.imgSrc='/assets/file_logo.svg';
    this.selectedImage=null;
  }
}
onSubmit(formValue){
this.isSubmitted = true;
if(this.formTemplate.valid){
  var filePath = `${formValue.Tranche}/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
const fileRef = this.storage.ref(filePath);
  this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(finalize(()=>{
    fileRef.getDownloadURL().subscribe((url)=>{
      formValue['imageUrl']=url;
      this.service.insertImageDetails(formValue);
      this.resetForm(); 
    })
  })).subscribe();
}

}
get formControls(){
  return this.formTemplate['controls'];
}
resetForm(){
  this.formTemplate.reset();
  this.formTemplate.setValue({
    Legende:'',
    imageUrl:'',
    Tranche:'Tranche1'
  });
  this.imgSrc = '/assets/file_logo.svg';
  this.selectedImage = null;
  this.isSubmitted=false;

}
}
