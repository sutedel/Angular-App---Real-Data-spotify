import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  public favourites: Array<any> | undefined; 

  private favouritesSub: any;

  constructor( private data: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.data.getFavourites().subscribe(data => {
      this.favourites = data.tracks;
    })
  }
  removeFromFavourites(id: string) {}

/*
  removeFromFavourites(id: string) {
    this.favouritesSub = this.data.removeFromFavourites(id).subscribe((data: { tracks: any[] | undefined; }) => {
      
      this.favourites = data.tracks;
    })
  }
*/
  ngOnDestroy(){
    this.favouritesSub?.unsubscribe(); 
  }
}