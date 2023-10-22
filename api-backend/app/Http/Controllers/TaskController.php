<?php

namespace App\Http\Controllers;

use App\Contracts\TaskRepositoryInterface;
use App\Http\Requests\TaskFormRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{

    private $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tasks = TaskResource::collection($this->taskRepository->all());
            return $tasks;
        } catch (\Exception $e) {
            // Log the error.
            Log::error('Error in TaskController::index(): ' . $e->getMessage());
            // Handle the exception and return a JSON response with an error message.
            return response()->json(['error' => 'An error occurred while getting tasks.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskFormRequest $request)
    {
        try {
            $data = $request->all();

            $task = $this->taskRepository->create($data);

            // to return a resource without the data wrap, simply return it in a JSON response
            return response()->json(new TaskResource($task));
        } catch (\Exception $e) {
            // Log the error.
            Log::error('Error in TaskController::store(): ' . $e->getMessage());
            // Handle the exception and return a JSON response with an error message.
            return response()->json(['error' => 'An error occurred while creating task.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $task = $this->taskRepository->find($id);

            if (!$task) {
                return response()->json(['message' => 'Task not found'], 404);
            }
            // to return a resource without the data wrap, simply return it in a JSON response
            return response()->json(new TaskResource($task));
        } catch (\Exception $e) {
            // Log the error.
            Log::error('Error in TaskController::show(): ' . $e->getMessage());
            // Handle the exception and return a JSON response with an error message.
            return response()->json(['error' => 'An error occurred while getting task.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskFormRequest $request, string $id)
    {
        try {
            $data = $request->all();

            $task = $this->taskRepository->update($id, $data);

            // to return a resource without the data wrap, simply return it in a JSON response
            return response()->json(new TaskResource($task));
        } catch (\Exception $e) {
            // Log the error.
            Log::error('Error in TaskController::update(): ' . $e->getMessage());
            // Handle the exception and return a JSON response with an error message.
            return response()->json(['error' => 'An error occurred while updating task.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $task = $this->taskRepository->find($id);

            if (!$task) {
                return response()->json(['message' => 'Task not found'], 404);
            }

            $this->taskRepository->delete($id);

            return response()->json(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            // Log the error.
            Log::error('Error in TaskController::destroy(): ' . $e->getMessage());
            // Handle the exception and return a JSON response with an error message.
            return response()->json(['error' => 'An error occurred while deleting task.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
