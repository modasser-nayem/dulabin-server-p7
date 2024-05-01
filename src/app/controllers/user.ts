import userServices from '../services/user';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const getMyProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await userServices.getMyProfile(user.id);

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Profile is successfully retrieved!',
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const result = await userServices.getUserProfile(req.params.username);

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'User Profile is successfully retrieved!',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const result = await userServices.updateMyProfile(req.user, req.body);

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Profile is successfully updated!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();

  sendResponse(res, {
    code: 200,
    success: true,
    message: 'Users is successfully retrieved!',
    data: result,
  });
});

const userControllers = {
  getMyProfile,
  getUserProfile,
  updateMyProfile,
  getAllUsers,
};
export default userControllers;
