﻿export class Question {
	private _idQuestion: string;
	private _idExpectedResult: string;
	private _idProcess: string;
	private _name: string;
	private _tip: string;
	private _dependsOnAnyQuestion: boolean;
	private _idDependentQuestion: string;

	get idQuestion(): string {
		return this._idQuestion;
	}

	set idQuestion(value: string) {
		this._idQuestion = value;
	}

	get idExpectedResult(): string {
		return this._idExpectedResult;
	}

	set idExpectedResult(value: string) {
		this._idExpectedResult = value;
	}

	get idProcess(): string {
		return this._idProcess;
	}

	set idProcess(value: string) {
		this._idProcess = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get tip(): string {
		return this._tip;
	}

	set tip(value: string) {
		this._tip = value;
	}

	get dependsOnAnyQuestion(): boolean {
		return this._dependsOnAnyQuestion;
	}

	set dependsOnAnyQuestion(value: boolean) {
		this._dependsOnAnyQuestion = value;
	}


	get idDependentQuestion(): string {
		return this._idDependentQuestion;
	}

	set idDependentQuestion(value: string) {
		this._idDependentQuestion = value;
	}
}