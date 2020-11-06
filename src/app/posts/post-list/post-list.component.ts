import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     {
    //         title: 'Birinchi maqola',
    //         content: 'Bu birinchi maqola'
    //     },
    //     {
    //         title: 'Ikkinchi maqola',
    //         content: 'Bu ikkinchi maqola'
    //     },
    //     {
    //         title: 'Uchinchi maqola',
    //         content: 'Bu uchinchi maqola'
    //     }
    // ]
    posts: Post[] = [];
    isLoading = false;
    private postsSub : Subscription;

    constructor(public postSerivce: PostService) { }

    ngOnInit() {
        this.isLoading = true;
        this.postSerivce.getPosts();
        this.postsSub = this.postSerivce.getPostUpdaterListener()
            .subscribe((posts: Post[]) => {
                this.isLoading = false;
                this.posts = posts;
            });
    }

    onDelete(id: string) {
        this.postSerivce.deletePost(id);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}