import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit , OnDestroy{

  results: any;
  searchQuery: string = "";
  private querySub: Subscription | undefined;
  private artistsSub: Subscription | undefined;

  constructor(private musicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'];

      this.artistsSub = this.musicData.searchArtists(this.searchQuery).subscribe(data=>{
        this.results = data.artists.items.filter((x:any)=>x.images.length > 0);
      });
    });
  }
  ngOnDestroy(): void {
    this.querySub?.unsubscribe();
    this.artistsSub?.unsubscribe();
  }

}
