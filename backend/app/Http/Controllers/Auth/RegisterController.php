<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Dirape\Token\Token;

class RegisterController extends BaseController
{

    /**
     * Register api
     *
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'address' => 'required|max:255',
            'phone_number' => 'nullable|max:255',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $token = new Token();
        $input['payment_id'] = $token->Unique('users', 'payment_id', 8);

        $user = User::create($input);
        //Szerepkör hozzáadása
        $user->user_roles()->create([
            'role_id'         => 2
        ]);

        $success['token'] =  $user->createToken('LandBooks')->plainTextToken;

        return $this->sendResponse($success);
    }

    /**
     * Login api
     *
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('LandBooks')->plainTextToken;
            $success['name'] =  $user->name;
            $success['role'] =  $user->roles[0]->reference;

            return $this->sendResponse($success);
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
    }
}
