<?php

namespace App\Http\Controllers\Auth;

use App\Models\SubscriptionType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Dirape\Token\Token;

class RegisterController extends BaseController
{

    public function index(Request $request)
    {
        return response()->json(SubscriptionType::all(), 200);
    }

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
            'password' => 'required|min:8',
            'c_password' => 'required|same:password',
            'address' => 'required|max:255',
            'phone_number' => 'nullable|max:255',
            'subscription_type_id' => 'nullable|exists:subscription_types,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $token = new Token();
        $input['payment_id'] = $token->Unique('users', 'payment_id', 8);

        $user = User::create($input);
        //Szerepkör hozzáadása
        $user->user_roles()->create([
            'role_id' => 2
        ]);

        return response()->json(['success' => true, 'id' => $user->id,], 200);
    }

    /**
     * Login api
     *
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $success['token'] = $user->createToken('LandBooks')->plainTextToken;
            $success['name'] = $user->name;
            $success['roles'] = $user->roles->pluck('reference');

            return $this->sendResponse($success);
        } else {
            return response()->json(['success' => false], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('Success');
    }
}
