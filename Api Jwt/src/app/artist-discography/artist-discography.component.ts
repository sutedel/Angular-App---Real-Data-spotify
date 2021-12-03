import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

albums :any;
artist:any;
id:string ="";
private sub:any;
  constructor(private data: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   /* let id = this.route.snapshot.params['id'];
    this.data.getArtistById(id).subscribe((data) => {
      this.artist = data;
    });
    console.log(this.data);
*/
 this.sub=  this.route.params.subscribe(params =>{
      this.id = params['id'];
      this.data.getArtistById(this.id).subscribe((data) => {
        this.artist = data;
      })
    })
    this.data.getAlbumsByArtistId(this.id).subscribe((data) => {
      const seen = new Set();
      let unique = data.items;
      this.albums = unique.filter((album: { name: unknown }) => {
        const duplicate = seen.has(album.name);
        seen.add(album.name);
        return !duplicate;
      });

   // this.albums= albumData.items.filter((curValue:any, index:any, self:any) => 
   // self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);

   // this.artist=artistData;
    console.log(this.albums);

    });
  }

}
