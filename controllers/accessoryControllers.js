import Accessory from "../models/accessory.js";

export function createAccessory(req,res){

    const accessory = new Accessory(req.body);

    accessory.save().then(
        ()=>{
            res.json({
                message : "Accossory Create Successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to create Accossory"
            })
        }
    )
}

export function getAccessory(req,res){

   
	Accessory.find()
		.then((accessory) => {
			res.json(accessory);
		})
		.catch(() => {
			res.json({
				message: "Failed to fetch Employee",
			});
		});
}


export function updateAccessoryById(req, res) {
    const accessoryId = req.params.accessoryId;

    Accessory.findOneAndUpdate({ accessoryId: accessoryId }, req.body, { new: true })
        .then((updatedAccessory) => {
            if (!updatedAccessory) {
                return res.status(404).json({ message: "Accessory not found" });
            }
            res.json({
                message: "Accessory updated successfully",
                data: updatedAccessory
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to update accessory", error });
        });
}


export function deleteAccessoryById(req, res) {
    const accessoryId = req.params.accessoryId;

    Accessory.findOneAndDelete({ accessoryId: accessoryId })
        .then((deletedAccessory) => {
            if (!deletedAccessory) {
                return res.status(404).json({ message: "Accessory not found" });
            }
            res.json({
                message: "Accessory deleted successfully",
                data: deletedAccessory
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to delete accessory", error });
        });
}
