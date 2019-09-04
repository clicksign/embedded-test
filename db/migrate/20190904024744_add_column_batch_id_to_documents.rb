class AddColumnBatchIdToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_column :documents, :batch_id, :integer
  end
end
