import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { NavigationService } from '../../observables/navigation.service';
import { MemberService } from '../../services/member.service';
import { Section } from '../../types/appSections';
import { Member } from '../../types/member.interface';

const TIMEOUT_STEP_MILLISECONDS = 350;

@Component({
  selector: 'our-team',
  standalone: true,
  imports: [CarouselModule, CommonModule, MIconComponent],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.scss',
})
export class OurTeamComponent implements OnInit, OnDestroy {
  @Input() ourTeamData!: Section;
  @Input() locationData!: Section;
  public ourTeamCarouselOptions!: OwlOptions;
  public animationDone = false;
  private subscription!: Subscription;
  membersList: Member[] = [];

  constructor(
    private navigationService: NavigationService,
    private memberService: MemberService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getMembers();
    this.setCarouselOptions();
    this.subscription = this.navigationService.languageObservable.subscribe(
      (language) => {
        if (language) {
          this.animationDone = false;
          this.ourTeamData.catalog?.map((item) => {
            item.animate = false;
          });
        }
      }
    );

    this.registerScrollEvent();
  }

  public animateList() {
    if (this.animationDone) {
      return;
    }

    let timeout = 0;
    this.ourTeamData.catalog!.map((item) => {
      item.animate = undefined;
      setTimeout(() => {
        item.animate = true;
      }, timeout);

      timeout += TIMEOUT_STEP_MILLISECONDS;
    });
    this.animationDone = true;
  }

  public registerScrollEvent(): void {
    window.addEventListener('scroll', async () => {
      const section = document.getElementById(this.ourTeamData.id!);
      if (
        window.scrollY >=
        section?.offsetTop! - section?.offsetHeight! / 1.75
      ) {
        this.animateList();
      }
    });
  }

  private setCarouselOptions() {
    this.ourTeamCarouselOptions = {
      dots: true,
      nav: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        800: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      },
    };
  }

  async getMembers() {
    try {
      const membersResult: any[] =
        (await this.memberService.getMembers().toPromise()) || [];
      this.membersList = membersResult;

      for (const member of this.membersList) {
        if (member.foto) {
          try {
            const image: string =
              (await this.memberService.getImage(member.foto).toPromise()) ||
              '';
            member.image = image;
          } catch (imageError) {
            console.error(
              `Error getting image for member with photo ID: ${member.foto}:`,
              imageError
            );
          }
        } else {
          console.warn('Member does not have a valid photo ID:', member);
        }
      }
      this.ourTeamData.catalog = this.membersList;
    } catch (error) {
      console.error('Error getting members:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
