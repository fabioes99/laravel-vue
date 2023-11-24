<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // por colocar resource nao preciso especificar qual a funcao que este endpoint esta passando
    // como delete, show, edit , etc..
    Route::resource('/surveys', SurveyController::class);
});

Route::get('survey-by-slug/{survey:slug}', [SurveyController::class, 'showForGuest']);
Route::post('survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
