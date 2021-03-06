﻿import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KnowledgeArea, MatQuestionDialogData, Question, Rating, TreeNode} from "../../_models";
import {MatDialog, MatTreeNestedDataSource} from "@angular/material";
import {NestedTreeControl} from "@angular/cdk/tree";
import {FormBuilder} from "@angular/forms";
import {QuestionComponent} from "../question";
import {cloneDeep, isEmpty, reject} from "lodash";

@Component({
	selector: 'tree-node-questions',
	templateUrl: 'tree-node-questions.component.html',
	styleUrls: ['tree-node-questions.component.scss']
})

export class TreeNodeQuestionsComponent implements OnInit {
	@Input('knowledgeAreas') knowledgeAreas: KnowledgeArea[];
	@Input('questions') questions: Question[] = [];
	@Input('ratings') ratings: Rating[] = [];
	@Input('type') type: string;
	@Output() onConfirmQuestions: EventEmitter<any> = new EventEmitter();

	treeControl = new NestedTreeControl<TreeNode>(node => node.children);
	dataSource = new MatTreeNestedDataSource<TreeNode>();
	loading: boolean = false;

	constructor(private formBuilder: FormBuilder, private  dialog: MatDialog) {
	}

	ngOnInit() {
		this.dataSource.data = this.knowledgeAreas.map(knowledgeArea => {
			let treeNode: TreeNode = new TreeNode();
			treeNode.idTreeNode = String(knowledgeArea.idKnowledgeArea);
			treeNode.name = knowledgeArea.name;
			treeNode.children = knowledgeArea.processes.map(process => {
				let treeNodeChildren: TreeNode = new TreeNode();
				treeNodeChildren.idTreeNode = process.idProcess;
				treeNodeChildren.name = process.name;
				treeNodeChildren.prefix = process.prefix;
				treeNodeChildren.expectedResults = process.expectedResults;
				return treeNodeChildren;
			});
			return treeNode;
		});
	}

	openDialog(node: TreeNode): void {
		const data = new MatQuestionDialogData();
		data.node = node;
		data.type = this.type;
		data.ratings = this.ratings;
		data.questions = isEmpty(this.questions) ? [] : cloneDeep(this.getQuestionsByProcess(node.idTreeNode));
		const dialogRef = this.dialog.open(QuestionComponent, {
			height: '95%',
			width: '95%',
			maxWidth: '95%',
			data: data,
			disableClose: true
		});

		dialogRef.afterClosed().subscribe((result: Question[]) => {
			if (result) {
				if (this.questions == null) {
					this.questions = [];
				}
				const idProcess = result[0].idProcess;
				const idsQuestions: string[] = this.questions.map((question: Question) => question.idQuestion);
				result.forEach(value => {
					if (!idsQuestions.includes(value.idQuestion)) {
						this.questions.push(value);
					} else {
						const actualQuestion = this.questions.find((question: Question) => question.idQuestion === value.idQuestion);
						if (actualQuestion !== value) {
							this.questions.splice(this.questions.indexOf(actualQuestion), 1);
							this.questions.push(value);
						}
					}
				});
				this.questions = reject(this.questions, (question => question.idProcess === idProcess && !result.includes(question)));
				this.onConfirmQuestions.emit(this.questions);
			}
		});
	}

	getQuestionsByProcess(idProcess: string) {
		return this.questions ? this.questions.filter(value => value.idProcess === idProcess): [];
	}

	hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
}
