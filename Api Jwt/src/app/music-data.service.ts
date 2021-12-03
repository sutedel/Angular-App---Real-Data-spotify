import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  public favourites: Array<any> | undefined; 
  favouritesList: any;
  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }
 /* getArtistById(id:any):Observable<any>{

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }*/
  getArtistById(id:string): Observable<any> {    
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}`  } });
    }));
}



  getAlbumsByArtistId(id:string):Observable<any>{

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));

  }
  getAlbumById(id:string):Observable<any>{

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));

  }
  searchArtists(searchString:string):Observable<any>{

    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));

  }
  addToFavourites(id:string): boolean{
    if(id && this.favouritesList.length < 50){
      this.favouritesList.push(id);
      return true;
    }else{
      return false;
    }
  }

  removeFromFavourites(id:string): Observable<any>{
    let indexOfId = this.favouritesList.indexOf(id);
    if (indexOfId > -1) {
      this.favouritesList.splice(indexOfId, 1);
    }
    return this.getFavourites();
    
  }

  getFavourites(): Observable<any>{
    if(this.favouritesList.length > 0){
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join()}`, { headers: { "Authorization": `Bearer ${token}` } })
      })); 
    }else{
      return new Observable(o=>{o.next([])});
    }
  }

}