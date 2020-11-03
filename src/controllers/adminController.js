import xl from 'exceljs';
import { join } from 'path';
import { usersModel } from '../models/userModel';

export const adminController = {
	ping,
	addExcel,
};

async function ping(req, res) {
	res.send('heath ok');
}

async function addExcel(req, res) {
	try {
		let wb = new xl.Workbook();
		let filePath = join(__dirname, '../files/Users.xlsx');
		wb.xlsx.readFile(filePath).then(async (_) => {
			let sh = wb.getWorksheet('Sheet1');

			let arr = [];
			let excelData = [];

			// read columns
			for (let i = 1; i <= sh.columnCount; i++) {
				arr.push(sh.getRow(1).getCell(i).value);
			}

			// read rows values
			for (let i = 2; i <= sh.rowCount; i++) {
				let obj = {};
				for (let j = 2; j <= sh.columnCount; j++) {
					let field = arr[j - 1];
					obj = { ...obj, [field]: sh.getRow(i).getCell(j).value };
				}
				excelData.push(obj);
			}

			// add data
			for (let i = 0; i < excelData.length; i++) {
				const { username, email, phone, fullname } = excelData[i];
				const user = await usersModel.findOne({ email: email });
				if (!user) {
					await usersModel(excelData[i]).save();
					continue;
				}

				user.username = username;
				user.email = email;
				user.phone = phone;
				user.fullname = fullname;

				await user.save();
			}

			res.send('file imported successfully');
		});
	} catch (error) {
		return error;
	}
}
