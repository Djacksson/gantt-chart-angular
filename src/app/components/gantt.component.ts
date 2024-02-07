import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';

import { gantt } from 'dhtmlx-gantt';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'gantt',
	styleUrls: ['./gantt.component.css'],
	providers: [TaskService, LinkService],
	template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
	@ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

	constructor(private taskService: TaskService, private linkService: LinkService) { }

	ngOnInit() {

		// gantt.config.project_start = new Date(2024, 2, 1);
		// gantt.config.project_end = new Date(2024, 2, 25);

		gantt.config.date_format = '%Y-%m-%d';
		gantt.config.details_on_create = false;
		gantt.config.details_on_dblclick = false;
		gantt.config.drag_move = false;
		gantt.config.drag_progress = false;
		gantt.config.drag_resize = false;
		gantt.config.drag_links = false;

		gantt.config.fit_tasks = true;
		gantt.config.grid_elastic_columns = true;

		

		gantt.init(this.ganttContainer.nativeElement);
		Promise.all([this.taskService.get(), this.linkService.get()])
			.then(([data, links]) => {
				gantt.parse({ data, links });
			});
	}
}
