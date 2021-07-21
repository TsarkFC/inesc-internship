import { 
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  file: any;

  constructor() {
    this.file = null;
  }

  ngOnInit(): void {
  }

  @HostBinding('class.fileover') fileOver: boolean = false;
  @Output() fileDropped = new EventEmitter<any>();
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef = new ElementRef(null);

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = false;
    this.prepareFile(e.dataTransfer.files);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(e: any) {
    this.prepareFile(e.target.files);
  }

  /**
   * Delete uploaded file
   */
  deleteFile() {
    if (this.file == null) return;
    if (this.file.progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.file = null;
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator() {
    setTimeout(() => {
        const progressInterval = setInterval(() => {
          if (this.file.progress === 100) {
            clearInterval(progressInterval);
          } else {
            this.file.progress += 5;
          }
        }, 200);
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFile(files: Array<any>) {
    if (files.length > 1) {
      alert('Only one file allowed!');
      return;
    }

    this.file = files[0];
    this.setVideoSource(this.file);
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator();
  }

  /**
   * Updates the source of the video player
   * @param file imported videos
   */
  setVideoSource(file: any) {
    let video = document.getElementById('video-player');
    if (video == null) {
      console.log('No video player defined!');
      return;
    }

    let source = document.createElement('source');
    source.setAttribute('src', URL.createObjectURL(file));
    video.innerHTML = '';
    video.appendChild(source);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}
