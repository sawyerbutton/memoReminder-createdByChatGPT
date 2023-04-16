import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss']
})
export class MemoComponent implements OnInit {
  memos: any[] = [];
  title: string = '';
  reminderTime: string = '';

  constructor() { }

  ngOnInit(): void {
    const storedMemos = JSON.parse(localStorage.getItem('memos') || '[]');
    this.memos = storedMemos.map((memo: any) => {
      if (new Date(memo.reminderTime) <= new Date()) {
        this.remind(memo);
      }
      return memo;
    });
  }

  addMemo() {
    const newMemo = {
      title: this.title,
      reminderTime: this.reminderTime,
      id: new Date().getTime(),
    };
    this.memos.push(newMemo);
    this.updateLocalStorage();
    this.title = '';
    this.reminderTime = '';
  }

  updateLocalStorage() {
    localStorage.setItem('memos', JSON.stringify(this.memos));
  }

  remind(memo: any) {
    const timeDifference = new Date(memo.reminderTime).getTime() - new Date().getTime();
    setTimeout(() => {
      alert(`备忘提醒：${memo.title}`);
    }, timeDifference);
  }
}
