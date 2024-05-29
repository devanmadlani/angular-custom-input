import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { SubSink } from "subsink";

@Component({
  selector: "linx-drag",
  templateUrl: "./drag.component.html",
  styleUrls: ["./drag.component.scss"],
})
export class DragComponent implements OnInit, AfterViewInit {
  @Input() productId: number;
  @Input() images: string[] = [
    "/apiv2/assets/ProductBeelden/Derivatives/a105252d-e102-4d9a-a38b-fa2ad32afb32.png",
    "/apiv2/assets/ProductBeelden/Derivatives/1ff8df5a-07b7-4fd6-85c7-bb8921949ee1.png",
    "/apiv2/assets/ProductBeelden/Derivatives/a105252d-e102-4d9a-a38b-fa2ad32afb32.png",
    "/apiv2/assets/ProductBeelden/Derivatives/1ff8df5a-07b7-4fd6-85c7-bb8921949ee1.png",
    "/apiv2/assets/ProductBeelden/Derivatives/a105252d-e102-4d9a-a38b-fa2ad32afb32.png",
    "/apiv2/assets/ProductBeelden/Derivatives/1ff8df5a-07b7-4fd6-85c7-bb8921949ee1.png",
    "/apiv2/assets/ProductBeelden/Derivatives/a105252d-e102-4d9a-a38b-fa2ad32afb32.png",
    "/apiv2/assets/ProductBeelden/Derivatives/1ff8df5a-07b7-4fd6-85c7-bb8921949ee1.png",
    "/apiv2/assets/ProductBeelden/Derivatives/a105252d-e102-4d9a-a38b-fa2ad32afb32.png",
    "/apiv2/assets/ProductBeelden/Derivatives/1ff8df5a-07b7-4fd6-85c7-bb8921949ee1.png",
    "/apiv2/assets/ProductBeelden/Derivatives/a105252d-e102-4d9a-a38b-fa2ad32afb32.png",
    "/apiv2/assets/ProductBeelden/Derivatives/1ff8df5a-07b7-4fd6-85c7-bb8921949ee1.png",
    "/apiv2/assets/ProductBeelden/Derivatives/a105252d-e102-4d9a-a38b-fa2ad32afb32.png",
    "/apiv2/assets/ProductBeelden/Derivatives/1ff8df5a-07b7-4fd6-85c7-bb8921949ee1.png",
    "/apiv2/assets/ProductBeelden/Derivatives/a105252d-e102-4d9a-a38b-fa2ad32afb32.png",
    "/apiv2/assets/ProductBeelden/Derivatives/1ff8df5a-07b7-4fd6-85c7-bb8921949ee1.png",
  ];
  @Input() product: any;
  selectedImage: string;
  @ViewChild("horizontalImage") horizontalImage: ElementRef;
  @ViewChild("verticalImage") verticalImage: ElementRef;

  pccIds = ["test1", "test2"];
  isVerticalScrollable = false;
  isHorizontalScrollable = false;
  subsink = new SubSink();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkScrollability();
    });
  }

  showImage(image: string) {
    this.selectedImage = image;
  }

  scrollLeft() {
    this.horizontalImage.nativeElement.scrollBy({ left: -200, behavior: "smooth" });
    this.checkScrollability();
  }

  scrollRight() {
    this.horizontalImage.nativeElement.scrollBy({ left: 200, behavior: "smooth" });
    this.checkScrollability();
  }

  scrollUp() {
    this.verticalImage.nativeElement.scrollBy({ top: -200, behavior: "smooth" });
    this.checkScrollability();
  }

  scrollDown() {
    this.verticalImage.nativeElement.scrollBy({ top: 200, behavior: "smooth" });
    this.checkScrollability();
  }

  checkScrollability(): void {
    const horizontalWrapper = this.horizontalImage.nativeElement;
    const verticalWrapper = this.verticalImage.nativeElement;

    this.isVerticalScrollable = verticalWrapper.scrollHeight > verticalWrapper.clientHeight;
    this.isHorizontalScrollable = horizontalWrapper.scrollWidth > horizontalWrapper.clientWidth;
  }

  onDragAndDrop = (event: CdkDragDrop<any>): void => {
    console.log(event);
    const currentPage = event.item?.data;
    const newPageIndex = +event.container?.id?.split("-")[1];
    console.log(event.container?.id);
    console.log(currentPage, newPageIndex);
    if (currentPage.pageIndex === newPageIndex) return;
  };
  save() {
    this.bsModalRef.hide();
  }

  close() {
    this.bsModalRef.hide();
  }
}
