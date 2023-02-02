import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    postCover = document.querySelector('#postCover')

    constructor() {
    }

    sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    showPostCover() {
        if (this.postCover !== null) {
            this.postCover.classList.remove('d-none')
        }
    }

    hidePostCover() {
        this.sleep(500).then(() => {
            if (this.postCover !== null) {
                this.postCover.classList.add('d-none')
            }
        })
    }

    showCover(cover: any) {
        cover.classList.remove('d-none')
    }

    hideCover(cover: any) {
        cover.value.classList.add('d-none')
    }

    hideScrollbar() {
        // @ts-ignore
        document.querySelector('body').style.overflow = 'hidden'
    }

    showScrollbar() {
        // @ts-ignore
        document.querySelector('body').style.overflow = 'auto'
    }

    scrollTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    transformDate = (date: any) => {
        if (date === null || date === '') {
            return ''
        }
        let newDate = new Date(date)
        let year = newDate.getFullYear()
        let m = newDate.getMonth() + 1
        let month = (m < 10) ? "0" + m : m
        let d = newDate.getDate()
        let day = (d < 10) ? "0" + d : d
        return year + "-" + month + "-" + day
    }
}
