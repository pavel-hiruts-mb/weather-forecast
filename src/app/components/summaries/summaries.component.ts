import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Summary} from '../../interfaces/summary';
import {DecimalPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-summaries',
  imports: [
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './summaries.component.html',
  styleUrl: './summaries.component.css'
})
export class SummariesComponent implements OnInit {

  summaries: Summary[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getSummaries$()
      .subscribe(response => { this.summaries = response; });
  }
}
