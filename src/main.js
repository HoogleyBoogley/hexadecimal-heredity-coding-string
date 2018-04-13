/*
 *	Hexadecimal Heredity Coding String
 *	Open source digital genetics simulation
 *	https://github.com/HoogleyBoogley/hexadecimal-heredity-coding-string
 *
 *	Copyright (c) 2018 Danny Tran - https://hoogleyboogley.com
 *	Acceptable use under the MIT license
 */

class HB_HHCS {

	constructor(quantity = 2, traits = 20, delay = 1000, runTimes = 1, maxValues= []) {
		console.log("\x1b[32m", "HHCS by Danny Tran(dannytran.me)", "\x1b[0m");

		// Set values
		this.quantity = quantity;
		this.traits = traits;
		this.delay = delay;
		this.heredityCodingStrings = {};
		this.reproTimes = 0;
		this.runTimes = runTimes;

		// Create and log the initial strings
		for (var i = 0; i < quantity; i++) {
			var str = this.create(i, traits, maxValues).join(', ');
			console.log("[" + str + "]");
			console.log("");
			console.log("");
		}

		var self = this;

		for (var i = 0; i < runTimes; i++) {
			setTimeout(function(){
			    self.reproduce("", "");
			}, delay * i);
		}
	}

	/*	====================
	 *	Create initial strings
	 *	==================== */
	create(quantity, traits, maxValues = []) {
		// Temp array
		var heredityString = [];

		// Create the IDs for the initial strings
		var numOfHeredityStrings = Object.keys(this.heredityCodingStrings).length;
		var StringID = "0x" + numOfHeredityStrings.toString(16);

		// Set the initial strings' gender
		var gender = "0x" + Math.floor(Math.random() * 2);
		heredityString.push(gender);

		// If trait lengths isn't set, then set it to 9999
		if (!maxValues.length) {
			for (var i = 0; i < traits; i++) {
				maxValues.push(9999);
			}
		}

		for (var i = 0; i < traits; i++) {
			// Generate initial random values
			var randInt = Math.floor(Math.random() * Math.floor(maxValues[i] + 1));
			var hexInt = "0x" + randInt.toString(16);
			heredityString.push(hexInt);
		}

		// Create a new object in the dictionary
		this.heredityCodingStrings[StringID] = heredityString;

		// Log the id
		console.log("\x1b[36m", "Creating subject " + StringID + "!", "\x1b[0m");

		// Return the newly created string
		return heredityString;
	}

	/*	====================
	 *	Create child string
	 *	==================== */
	reproduce(maleID = "", femaleID = "") {
		var hhcsArr = this.heredityCodingStrings;
		var numOfTraits = this.traits;

		var maleID = maleID;
		var femaleID = femaleID;

		if (maleID == "") {
			maleID = "0x" + Math.floor(Math.random() * Object.keys(this.heredityCodingStrings).length).toString(16);
			console.log("FatherID: " + maleID);
		}

		if (femaleID == "") {
			femaleID = "0x" + Math.floor(Math.random() * Object.keys(this.heredityCodingStrings).length).toString(16);
			console.log("MotherID: " + femaleID);
		}

		// Set id values for the mother and father strings
		var father = hhcsArr[maleID];
		var mother = hhcsArr[femaleID];

		// Create the child string id
		var numOfHeredityStrings = Object.keys(hhcsArr).length;
		var StringID = "0x" + numOfHeredityStrings.toString(16);

		// Create array to contain child string information
		var newChild = [];

		// Make sure the first parameters are different
		if (father[0] != mother[0]) {

			// Set the child string's gender
			newChild.push("0x" + Math.floor(Math.random() * 2));

			// Create the trait values
			for (var i = 1; i < numOfTraits + 1; i++) {
				// Decide to Inherit mother's or father's trait
				if (Math.floor(Math.random() * 2) == 1) {
					// Inherit father's trait
					newChild.push(father[i]);
				} else {
					// Inherit mother's trait
					newChild.push(mother[i]);
				}
			}

			// Log the new child string
			var str = newChild.join(', ');
			console.log("\x1b[36m", "Creating subject " + StringID + "(Child of " + maleID + " and " + femaleID + ")!", "\x1b[0m");
			this.heredityCodingStrings[StringID] = newChild;
			console.log("[" + str + "]");
			console.log("");

			// Reproduction successful, return true value
			return true;
		} else {
			// Reproduction unsuccessful, return false value
			console.log("\x1b[31m", "Unable to reproduce!", "\x1b[0m");
			console.log("");
			return false;
		}

	}

	death(stringID = "") {
		var stringID = stringID;

		if (stringID == "") {
			
		}

	}

}

/*	====================
 *	Testing
 *	==================== */

var HHCS = new HB_HHCS(4, 20, 1500, 50, [
	255,
	255,
	40,
	5,
	255,
	9999,
	255,
	25,
	255,
	2420,
	255,
	255,
	65,
	255,
	98,
	255,
	123,
	26,
	255,
	15
]);
