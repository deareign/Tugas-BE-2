const Division = require('../model/Division');
const User = require('../model/User');

const getAllUser = async (req, res, next) => {
  try {
    // TUGAS NOMOR 1
    const users = await User.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "No user data found"
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully fetch all user data",
      users: users.map(user => ({
        id: user.id,
        fullName: user.fullName,
        angkatan: user.angkatan,
        divisionId: user.divisionId
      }))
    });
  } catch (error) {
    console.log("Terjadi error berupa", error.message);
  }
};

const getUserById = async (req, res, next) => {
  try {
    //TUGAS NOMOR 2 cari user berdasarkan userId
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user|| users.length === 0) {
      return res.status(404).json({
        status: 'Error',
        message: 'User not found',
      });
    }

      res.status(200).json({
      status: 'Success',
      message: 'Successfully fetch user data',
      user: {
        id: user.id,
        fullName: user.fullName,
        angkatan: user.angkatan,
        divisionId: user.divisionId,
      },
    });
  } catch (error) {
    console.log("Terjadi error berupa", error.message);;
  }
};

const postUser = async(req,res,next)=>{
  try {
    const {
      fullName, nim, angkatan, email, password, division
    } = req.body

    //cari divisi id
    //pakai await untuk menghindari penulisan then
    const user_division = await Division.findOne({
      where:{
        name: division
      }
    });

    //SELECT * FROM DIVISION WHERE name = division
    if(user_division == undefined){
      res.status(400).json({
        status: "Error",
        message: `${division} is not existed`
      })
    }

    //insert data ke tabel User
    const currentUser = await User.create({
      //nama field: data
      fullName: fullName,
      //jika nama field == data maka bisa diringkas
      email,
      password,
      angkatan,
      nim,
      divisionId: user_division.id
    })

    //send response
    res.status(201).json({
      status: "success",
      message: "Successfuly create User",
      user: {
        fullName: currentUser.fullName,
        division: currentUser.division
      }
    })

  } catch (error) {
    console.log("Terjadi error berupa", error.message);

  }
}

const deleteUser = (req,res,next)=>{
  try {
    const {userId} = req.params;

    //mencari index user dari array model user
    const targetedIndex = User.findIndex((element)=>{
      return element.id == userId
    })

    //user tidak ketemu
    if(targetedIndex === -1){
      res.status(400).json({
        status: "Error",
        message: `User with id ${userId} is not existed`
      })
    }

    //hapus array pada [targetedIndex] sebanyak 1 buah element
    User.splice(targetedIndex, 1);

    res.status(200).json({
      status: "Success",
      message: "Successfully delete user"
    })
  } catch (error) {
    console.log("Terjadi error berupa", error.message);

  }
}

module.exports = {
  getAllUser, getUserById, postUser, deleteUser
}