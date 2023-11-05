const changePasswordAndSave = async (res,currentPassword,newPassword,user)=>{
    // Check if the current password is correct
  if (!(await user.matchPassword(currentPassword))) {
    res.status(400);
    throw new Error("Current password is incorrect.");
  }
// Check if the new password is different from the current password
if(currentPassword === newPassword ){
  res.status(400);
  throw new Error("New password must be different than old password");
}


user.password = newPassword
// Save the user to hash the new password and trigger the `pre('save')` middleware
await user.save();

return true;

}

export default changePasswordAndSave;