import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;  
  private id: string="";
  private sub:any;
  private liveAlbumSub :any;
  private subFavourites :any;
  private favourites :any;



  constructor( private route: ActivatedRoute, private data: MusicDataService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.id = params['id']; 
    this.liveAlbumSub = this.data.getAlbumById(this.id).subscribe(data => this.album = data);
    });
  }
 addToFavourites(trackID:string){}
   /* this.data.addToFavourites(trackID:string)this.subFavourites = this.data.addToFavourites(this.id).subscribe(
      favourites =>{
        this.favourites = favourites;
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      });
  }*/
  ngOnDestroy(){
    this.sub?.unsubscribe();
    this.liveAlbumSub?.unsubscribe();
    this.subFavourites?.unsubscribe();
  }

}
