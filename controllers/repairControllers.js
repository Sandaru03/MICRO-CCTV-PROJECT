import Repair from "../models/repair.js";

export function createReapair(req,res){

    const repair = new Repair(req.body);

    repair.save().then(
        ()=>{
            res.json({
                message : "Repair Create Successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to create repair"
            })
        }
    )
}

export function getRepair(req,res){

    Repair.find()
		.then((repair) => {
			res.json(repair);
		})
		.catch(() => {
			res.json({
				message: "Failed to fetch Repair",
			});
		});
}