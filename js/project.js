
var projectList = Array();


var ProjectManager = {

	generateSpaces : function(){
		var proj = null;
		for(space in projectList){
			proj = projectList[space];
			$("#project-space-wrapper").append("<li> <span class='project-title'>"+proj.projectName+"</span>    <span class='time-remaining'>  </span>    <span class='resource'> Resource(s):"+proj.resources[0]+"<span> </li>");

		}
	},

	timerLoop : function(){
		for(space in projectList){
			var t = projectList[space].timeRemaining();
			$(".time-remaining").eq(space).html(t.d + " Days " + t.h + " Hours " + t.m + " Minutes " + t.s + " Seconds Remaining");
		}

		setTimeout(ProjectManager.timerLoop, 1000);
	}
};


var Project = (function(){
	function Project(projectName, startDate, endDate, resources){
		
		if(typeof projectName !== "string" || typeof startDate !== "string" || typeof endDate !== "string"){
			throw new Error("Project Name, Start Date and End Date are required.");
		}

		this.startDate = new Date(startDate);
		this.endDate = new Date(endDate);
		this.projectName = projectName;
		this.resources = [];

		if(typeof projectList === "object"){
			projectList.push(this);
		}

		if(typeof resources === "object"){
			for(person in resources){
				this.resources.push(resources[person]);
			}
		}

	}

	Project.prototype = {
		hasStarted : function(){
			var now = new Date();
			return now.getTime() > this.startDate.getTime();
		},
		hasEnded : function(){
			var now = new Date();
			return now.getTime() > this.endDate.getTime();
		},
		timeRemaining : function(){
			var now = new Date();
			var timeDiff = this.endDate.getTime() - now.getTime();
			var s = Math.floor(timeDiff / 1000);
			var m = Math.floor(s / 60);
			var h = Math.floor(m / 60);
			var d = Math.floor(h / 24);
			h %= 24;
			m %= 60;
			s %= 60;
			return {d:d, h:h, m:m, s:s};
		},

	};

	return Project;
})();



var addYourFlavor = new Project("Add Your Flavor", "March 7 2013", "April 24 2013", ["Josh"]);  	//	Example
var ultimateSpot = new Project("The Ultimate Spot", "March 28 2013", "May 23 2013", ["Josh"]);		// 	Example
var linkRelocation = new Project("Link Relocation", "April 5 2013","May 9 2013", ["Josh"]);			//	More Example

$(document).ready(function(){

	/*GenerateWorkSpace*/
	ProjectManager.generateSpaces();

	/*StartSlider*/
	window.swipe = new Swipe(
		document.getElementById('slider')
	);

	ProjectManager.timerLoop();

});