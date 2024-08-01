import soilModel from "../../../../DB/model/Soil.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import axios from "axios";
import fs from 'fs';
import FormData from 'form-data';

export const uploadSoil = asyncHandler(async (req, res, next) => {
  try {
    const file = req.file;
    const saveHistory = req.query.saveHistory === 'true'; // Check the saveHistory query parameter
    const form = new FormData();
    form.append('file', fs.createReadStream(file.path));

    const response = await axios.post('http://127.0.0.1:8000/predict/', form, {
      headers: form.getHeaders(),
    });

    if (saveHistory) {
      const soil = await soilModel.create({
        name: response.data["class"],
        image: file, 
        confidence: response.data["confidence"],
        user: req.user._id,
      });
      res.status(200).json(soil);
    } else {
      res.status(200).json({
        name: response.data["class"],
        confidence: response.data["confidence"],
      });
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

export const history = asyncHandler(async (req, res, next) => {
  try {
    const soilHistory = await soilModel.find({ user: req.user._id });
    res.status(200).json(soilHistory);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
export const deleteSoil = asyncHandler(
  async (req, res, next) => {
    try {
      const soilId = req.body;
      await soilModel.findByIdAndDelete(soilId);
      res.status(200).json({ message: "Soil record deleted successfully." });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  }
);
