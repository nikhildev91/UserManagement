const async = require('hbs/lib/async')
const {ObjectId} = require('mongodb')
var dataBase = require('../dataConfig/connection')


module.exports={

    insertUserData: (userData)=>{
        return new Promise ((resolve, reject)=>{
            userData.isEnabled=true
            dataBase.get().collection('UsersData').insertOne(userData).then(()=>{
                return resolve(true)
            }).catch(()=>{
                return reject(false)
            })
        })
    },

    findUser: (userDataLogin)=>{
        return new Promise (async(resolve, reject)=>{
           var user= await dataBase.get().collection('UsersData').findOne({Email:userDataLogin.Email, Password:userDataLogin.Password, isEnabled:true})

           if(user){
            return resolve({status : true, user})
           }else{
               return resolve({status : false})
           }

        // dataBase.get().collection('UsersData').findOne({Email:userDataLogin.Email, Password:userDataLogin.Password}).then(()=>{
        //     resolve({status : true, user})
        })

           
    
              
    
    },

    findAdmin: (adminLoginData)=>{
        return new Promise (async(resolve, reject)=>{
            var admin= await dataBase.get().collection('AdminData')
            .findOne({Email:adminLoginData.Email, Password:adminLoginData.Password})

            console.log("sfjsbfs : "+admin);

            if(admin){
                return resolve({status : true, admin})
            }else{
                return resolve({status : false})
            }
        })
    },

    getAllUsers:()=>{
        return new Promise (async (resolve, reject)=>{
            var allUsers = await dataBase.get().collection('UsersData').find().toArray()
           
            return resolve(allUsers)
            
        })
    },
    getUserDetails: (UserId)=>{
        return new Promise ((resolve, reject)=>{
            dataBase.get().collection("UsersData").findOne({_id:ObjectId(UserId)}).then((foundUser)=>{
                resolve(foundUser)
            })
        })
    },

    updateUserData: (UserId, UserData)=>{
        return new Promise ((resolve, reject)=>{
            dataBase.get().collection("UsersData").updateOne({_id:ObjectId(UserId)}, {
                $set:{
                    Name: UserData.Name, 
                    Email: UserData.Email
                }
            }).then(()=>{
                resolve(true)
            })
        })
    },

    deleteUser:(UserId)=>{
        return new Promise ((resolve, reject)=>{
            dataBase.get().collection('UsersData').deleteOne({_id:ObjectId(UserId)}).then(()=>{
                resolve(true)
            })
        })
    },
    enableUser:(UserId)=>{
        return new Promise ((resolve, reject)=>{
            dataBase.get().collection('UsersData').updateOne({_id:ObjectId(UserId)},{
                $set:{
                    isEnabled: true
                }
            }).then(()=>{
                resolve(true)
            })
        })
    },

    disableUser:(UserId)=>{
        return new Promise ((resolve, reject)=>{
            dataBase.get().collection('UsersData').updateOne({_id:ObjectId(UserId)},{
                $set:{
                    isEnabled: false
                }
            }).then(()=>{
                resolve(true)
            })
        })
    },

    adduser: (adminAddedUser)=>{
        return new Promise ((resolve, reject)=>{
            adminAddedUser.isEnabled=true
            dataBase.get().collection('UsersData').insertOne(adminAddedUser).then(()=>{
                return resolve(true)
            }).catch(()=>{
                return reject(false)
            })
        })
    },

    forCheckEmail: (checkEmail)=>{
        return new Promise ((resolve, reject)=>{
            dataBase.get().collection("UsersData").findOne({Email:checkEmail}).then((emailUsed)=>{
                if (emailUsed){
                    return resolve(true)
                }else{
                    return resolve(false)
                }
            }).catch(()=>{

                return reject(false)

            })
        })
    }
    
     
}


