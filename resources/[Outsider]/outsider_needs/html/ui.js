let hunger;
let thirst;
let inEditMode = false;

/**
 * Makes an element draggable
 * @param {object} element - The element to make draggable
 * @param {string} className - The class name of the element
 * 	
 * @returns {void}
 * */
function makeDraggable(element, className) {

	element.draggable({
		stop: function (event, ui) {
			var pos = ui.position;
			element.css({
				top: pos.top + "px",
				left: pos.left + "px",
			});
			$.post(
				`https://${GetParentResourceName()}/UIposition`,
				JSON.stringify({
					x: pos.left,
					y: pos.top,
					className: className,
				})
			);
		},
	}).addClass(className);
}

/**
 * Updates the stamina UI element
 * @param {object} item - The item to update the stamina UI with
 * 	
 * @returns {void}
 * */
function updateStamina(item) {
	$(".stamina .staminaimg").css("animation", "pulseimg 1s;animation-iteration-count: 1;");
	$(".staminaimg").attr("src", item.img);
	hunger.innerHTML = item.Hv;
	setTimeout(function () {
		hunger.innerHTML = "";
		$(".staminaimg").css("animation", "none");
	}, 5000);
}

/**
 * Updates the health UI element
 * @param {object} item - The item to update the health UI with
 * 	
 * @returns {void}
 * */
function updateHealth(item) {
	$(".health .healthimg").css("animation", "pulseimg 1s;animation-iteration-count: 1;");
	$(".healthimg").attr("src", item.img);
	hunger.innerHTML = item.Hv;
	setTimeout(function () {
		hunger.innerHTML = "";
		$(".health .healthimg").css("animation", "none");
	}, 5000);
}


/**
 * Updates the hunger UI element
 * @param {object} item - The item to update the hunger UI with
 * 	
 * @returns {void}
 * */
function updateHunger(item) {
	$(".hunger .hungerimg").css("animation", "pulseimg 1s;animation-iteration-count: 1;");
	$(".hungerimg").attr("src", item.img);
	hunger.innerHTML = item.Hv;
	setTimeout(function () {
		hunger.innerHTML = "";
		$(".hunger .hungerimg").css("animation", "none");
	}, 5000);
}

/**
 * Updates the thirst UI element
 * @param {object} item - The item to update the thirst UI with
 * 	
 * @returns {void}
 * */
function updateThirst(item) {
	$(".thirst .thirstimg").css("animation", "pulseicon 1s ;animation-iteration-count: 1;");
	$(".thirstimg").attr("src", item.img1);
	thirst.innerHTML = item.Tv;
	setTimeout(function () {
		thirst.innerHTML = "";
		$(".thirst .thirstimg").css("animation", "none");
	}, 5000);
}

/**
 * Shows a grid overlay on the screen
 * @returns {void}
 * */
function showGridOverlay() {
	const gridOverlay = document.createElement('div');
	gridOverlay.id = 'grid-overlay';
	gridOverlay.style.position = 'absolute';
	gridOverlay.style.top = '0';
	gridOverlay.style.left = '0';
	gridOverlay.style.width = '100%';
	gridOverlay.style.height = '100%';
	gridOverlay.style.backgroundSize = '20px 20px';
	gridOverlay.style.backgroundImage =
		'linear-gradient(to right, lightgray 1px, transparent 1px), ' +
		'linear-gradient(to bottom, lightgray 1px, transparent 1px)';
	gridOverlay.style.pointerEvents = 'none';
	gridOverlay.style.zIndex = '10';
	gridOverlay.style.opacity = '0.5';
	document.body.appendChild(gridOverlay);
}

/**
 * Hides the grid overlay
 * @returns {void}
 * */
function hideGridOverlay() {
	const gridOverlay = document.getElementById('grid-overlay');
	if (gridOverlay) {
		gridOverlay.style.display = 'none';
		document.body.removeChild(gridOverlay);
	}
}


/**
 * 	non blocking function to set up draggable elements
 * @returns {void}
 */
async function setUpDraggables() {
	makeDraggable($(".temp"), "temp");
	makeDraggable($(".hunger"), "hunger");
	makeDraggable($(".thirst"), "thirst");
	makeDraggable($(".voice"), "voice");
	makeDraggable($(".bath"), "bath");
	makeDraggable($(".health"), "health");
	makeDraggable($(".stamina"), "stamina");
	makeDraggable($(".templocal"), "templocal");
	makeDraggable($(".horseHealth"), "horseHealth");
	makeDraggable($(".horseStamina"), "horseStamina");
	makeDraggable($(".stress"), "stress");
	makeDraggable($(".addiction"), "addiction");
}

document.onkeyup = function (data) {
	if (data.key === "Escape") {
		$.post(`https://${GetParentResourceName()}/UIclose`, JSON.stringify({}));
		hideGridOverlay();
		inEditMode = false;
	}
};

window.addEventListener("message", function (event) {
	if (event.data.type === "UIposition") {
		let element = $(`.${event.data.className}`);
		element.css({
			top: event.data.y + "px",
			left: event.data.x + "px",
		});
	} else if (event.data.action == "setMicMuteStatus") {

		if (event.data.status == true) {
			$('.voice .voiceimg').attr("src", "img/voicered.png");
		} else {
			$('.voice .voiceimg').attr("src", "img/voicewhite.png");
		}
	}
});

document.addEventListener("DOMContentLoaded", function () {

	setUpDraggables();
	document.body.style.display = "none";
	window.addEventListener("message", function (event) {

		document.body.style.display = "block";

		let item = event.data;
		let voiceDiv = document.querySelector(".voice");
		let dirtyDiv = document.querySelector(".bath");
		let Btemp = document.getElementById("loading");
		let BTemp = document.getElementById("load");
		thirst = document.getElementById("thirst-v");
		hunger = document.getElementById("hunger-v");
		let voice = document.getElementById("voice-v");
		let bath = document.getElementById("bath-v");
		let temp = document.getElementById("tempnumber");
		let healthPlayerUI = document.querySelector(".health");
		let staminaPlayerUI = document.querySelector(".stamina");
		let healthHorseUI = document.querySelector(".horseHealth");
		let staminaHorseUI = document.querySelector(".horseStamina");
		let HorseXpH = document.getElementById("horseHealth-v");
		let HorseXpS = document.getElementById("horseStamina-v");
		let stressUI = document.querySelector(".stress");
		let addictionUI = document.querySelector(".addiction");

		if (item.action === "edit") {
			if (!inEditMode) {
				inEditMode = true;
				const classNames = [
					".temp",
					".hunger",
					".thirst",
					".voice",
					".bath",
					".health",
					".stamina",
					".templocal",
					".horseHealth",
					".horseStamina",
					".stress",
					".addiction"
				];

				classNames.forEach(className => {
					$(className).css("display", "block");
				});
				showGridOverlay();
			}

		} else {



			/* notify */
			if (item.type === "hotTemp") {
				BTemp.innerHTML = item.Ht;
			}

			if (item.type === "dirty") {
				bath.innerHTML = item.bathWarning;
			}

			if (item.type === "UI") {
				temp.innerHTML = item.localtemp;

				if (!item.usevoice) {
					voiceDiv.style.display = "none";
				} else {

					if (item.talking) {
						voiceDiv.style.display = "block";
						$(".voice").css("animation", "pulse 0.8s infinite");
						$(".voiceimg").css("animation", "pulseicon 0.3s infinite");
					} else {
						$(".voice").css("animation", "none");
						$(".voiceimg").css("animation", "none");
					}
				}

				// enabled Bath
				if (!item.dirtysystem) {
					dirtyDiv.style.display = "none";
				} else {
					if (item.dirtylevel >= 10) {
						$(".bathimg").attr("src", item.imgdirty);
						dirtyDiv.style.display = "block";
					} else {
						dirtyDiv.style.display = "none";
					}
				}
				//enabled stress
				if (!item.usestress) {
					stressUI.style.display = "none";
				} else {
					if (item.stresslevel >= 1) {

						stressUI.style.display = "block";
						$(".stressimg").attr("src", item.Imgstress);
						$(".stress-img").attr("src", item.ImgCircularStress);
					} else {
						stressUI.style.display = "none";
					}
				}

				//enabled addiction
				if (!item.useaddiction) {
					addictionUI.style.display = "none";
				} else {
					if (item.addictionlevel >= 1) {
						addictionUI.style.display = "block";
						$(".addictionimg").attr("src", item.Imgaddiction);
						$(".addiction-img").attr("src", item.ImgCircularAddiction);
					} else {
						addictionUI.style.display = "none";
					}
				}


				// HORSE
				if (!item.useHealthStaminaHorseSystem) {
					healthHorseUI.style.display = "none";
					staminaHorseUI.style.display = "none";
				} else {
					healthHorseUI.style.display = "block";
					staminaHorseUI.style.display = "block";


					if (!item.onHorse) {
						healthHorseUI.style.display = "none";
						staminaHorseUI.style.display = "none";
					} else {
						healthHorseUI.style.display = "block";
						staminaHorseUI.style.display = "block";
						HorseXpH.innerHTML = item.hXP;
						HorseXpS.innerHTML = item.sXP;
					}

					$(".healthHorseimg").attr("src", item.imgHealthHorse || "img/hcore_state_15");
					$(".staminaHorseimg").attr("src", item.imgStaminaHorse || "img/hscore_state_15");
					$(".horsehealth-img").attr("src", item.goldHealthHorse);
					$(".horsestamina-img").attr("src", item.goldStaminaHorse);
				}

				// PLAYER
				if (!item.useHealthStaminaSystem) {
					healthPlayerUI.style.display = "none";
					staminaPlayerUI.style.display = "none";
				} else {
					healthPlayerUI.style.display = "block";
					staminaPlayerUI.style.display = "block";

					$(".healthimg").attr("src", item.imgHealth);
					$(".staminaimg").attr("src", item.imgStamina);
					$(".health-img").attr("src", item.imgHealthOutter);
					$(".stamina-img").attr("src", item.imgStaminaOutter);
				}

				// image change
				$(".hunger-img").attr("src", item.circularFood);
				$(".thirst-img").attr("src", item.circularWater);
				$(".hungerimg").attr("src", item.img);
				$(".thirstimg").attr("src", item.img1);

				if (!item.useSaltyChat) {
					$(".voiceimg").attr("src", item.imgVoice);
				}
				$(".tempimg").attr("src", item.imgtemp);
				$(".temp").css("border", item.color);

				// sprinting logic
				if (item.isrunning) {
					if (!item.onHorse) {
						$(".thirstimg, .staminaimg").css("animation", "pulseicon 0.3s infinite");
						$(".stamina, .thirst").css("animation", "pulse 0.8s infinite");
						if (item.removehunger) {
							$(".hunger").css("animation", "pulse 0.9s infinite");
							$(".hungerimg").css("animation", "pulseicon 0.3s infinite");
						}

						$(".stressimg").css("animation", "pulseicon 0.3s infinite");
						$(".stress").css("animation", "pulse 0.8s infinite");

					} else {
						if (item.useHealthStaminaHorseSystem) {
							$(".staminaHorseimg").css("animation", "pulseicon 0.3s infinite");
							$(".horseStamina").css("animation", "pulse 0.8s infinite");
						}
						$(".thirstimg, .staminaimg").css("animation", "none");
						$(".stamina, .thirst").css("animation", "none");
						$(".stressimg ").css("animation", "pulseicon 0.3s infinite");
						$(".stress").css("animation", "pulse 0.8s infinite");
						if (item.removehunger) {
							$(".hunger,.hungerimg").css("animation", "none");
						}
					}

				} else {
					$(".stamina, .thirst, .horseStamina, .hunger, .hungerimg, .stressimg, .stress, .thirstimg, .staminaimg, .staminaHorseimg").css("animation", "none");
				}

				//pulse
				if (item.pulse) {
					Btemp.innerHTML = item.word;
				} else {
					Btemp.innerHTML = item.word;
				}
			}

			if (item.type === "speak") {
				voice.innerHTML = item.rangeType;
			}

			if (item.type === "ShowAll") {
				if (item.HideUi) {
					$(".container").attr("style", "left: -2000px;opacity: 0;visibility: hidden;transition: left 0s 0.8s, visibility 0s 0.8s, opacity 0.8s;");
				} else {
					$(".container").attr("style", "left: 0; opacity: 1;visibility: visible;transition: left 0s, visibility 0s, opacity 0.8s;");
				}
			}

			if (item.type === "health") {
				updateHealth(item);
			}

			if (item.type === "stamina") {
				updateStamina(item);
			}

			if (item.type === "hunger") {
				updateHunger(item);
			}

			if (item.type === "thirst") {
				updateThirst(item);
			}
		}
	});
});
