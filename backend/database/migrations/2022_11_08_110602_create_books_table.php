<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();

            $table->string('title');

            $table->tinyText('description');

            $table->string('published');

            $table->unsignedInteger('number_of_page');

            $table->string('isbn_code')->unique();

            $table->unsignedInteger('in_stock');

            $table->unsignedInteger('available');

            $table->foreignId('cover_type_id')
                ->nullable()
                ->references('id')
                ->on('cover_types')
                ->onUpdate('cascade')
                ->onDelete('set null');

            $table->foreignId('file_id')
                ->nullable()
                ->references('id')
                ->on('files')
                ->onUpdate('cascade')
                ->onDelete('set null');

            $table->tinyInteger('is_new')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
};
